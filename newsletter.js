(function () {
  var KEY = 'k9pd-newsletter'
  var DAY = 864e5
  var DISMISS_MS = 21 * DAY
  var SUBMIT_MS = 365 * DAY

  function readGate() {
    try { return JSON.parse(localStorage.getItem(KEY) || 'null') }
    catch (e) { return null }
  }
  function writeGate(why) {
    try { localStorage.setItem(KEY, JSON.stringify({ why: why, at: Date.now() })) }
    catch (e) {}
  }
  function gated() {
    var g = readGate()
    if (!g || !g.at) return false
    return Date.now() - g.at < (g.why === 'submit' ? SUBMIT_MS : DISMISS_MS)
  }

  function setStatus(form, type, text) {
    var el = form.querySelector('.nl-status')
    if (!el) return
    el.className = 'nl-status' + (type ? ' ' + type : '')
    el.textContent = text || ''
  }

  function onSubmit(e) {
    var form = e.currentTarget
    e.preventDefault()
    var email = (form.email && form.email.value || '').trim()
    var company = (form.company && form.company.value || '').trim()
    var source = form.getAttribute('data-nl') || 'cta'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus(form, 'err', 'Please enter a valid email.')
      if (form.email) form.email.focus()
      return
    }
    form.classList.add('is-busy')
    setStatus(form, '', 'Sending…')
    fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ email: email, source: source, company: company })
    }).then(function (res) {
      return res.json().then(function (data) { return { res: res, data: data } }).catch(function () {
        return { res: res, data: {} }
      })
    }).then(function (out) {
      var data = out.data || {}
      if (out.res.ok && data.ok) {
        setStatus(form, 'ok', data.status === 'already'
          ? "You're already on the list."
          : "You're on the list. We'll write when there is something worth opening.")
        if (form.email) form.email.value = ''
        writeGate('submit')
      } else if (data.code === 'rate') {
        setStatus(form, 'err', 'Please wait a few minutes and try again.')
      } else if (data.code === 'unavailable') {
        setStatus(form, 'err', 'Signup is temporarily unavailable. Please try again later.')
      } else {
        setStatus(form, 'err', data.error || 'Something went wrong. Please try again.')
      }
    }).catch(function () {
      setStatus(form, 'err', 'Network error. Check your connection and try again.')
    }).then(function () {
      form.classList.remove('is-busy')
    })
  }

  document.querySelectorAll('form.nl-form').forEach(function (form) {
    form.addEventListener('submit', onSubmit)
  })

  var pop = document.querySelector('.nl-pop')
  if (!pop) return

  var lastFocus = null
  var opened = false
  var force = false
  try { force = new URLSearchParams(location.search).get('nl') === '1' } catch (e) {}

  function focusables() {
    return Array.prototype.slice.call(pop.querySelectorAll(
      'a[href],button:not([disabled]),input:not([disabled]):not([tabindex="-1"]),select,textarea,[tabindex]:not([tabindex="-1"])'
    )).filter(function (el) {
      return !el.closest('.nl-hp')
    })
  }

  function openPop() {
    if (opened || pop.hidden === false && opened) return
    if (!force && gated()) return
    opened = true
    lastFocus = document.activeElement
    pop.hidden = false
    document.body.style.overflow = 'hidden'
    Array.prototype.forEach.call(document.body.children, function (el) {
      if (el !== pop) el.inert = true
    })
    var first = pop.querySelector('input[type=email]') || pop.querySelector('.nl-x')
    setTimeout(function () { if (first) first.focus() }, 40)
  }

  function closePop() {
    if (pop.hidden) return
    pop.hidden = true
    opened = false
    document.body.style.overflow = ''
    Array.prototype.forEach.call(document.body.children, function (el) { el.inert = false })
    if (!readGate() || readGate().why !== 'submit') writeGate('dismiss')
    if (lastFocus && lastFocus.focus) lastFocus.focus()
  }

  pop.addEventListener('click', function (e) {
    if (e.target.closest('[data-nl-close]')) closePop()
  })

  document.addEventListener('keydown', function (e) {
    if (pop.hidden) return
    if (e.key === 'Escape') {
      e.preventDefault()
      closePop()
    }
    if (e.key === 'Tab') {
      var list = focusables()
      if (!list.length) return
      var i = list.indexOf(document.activeElement)
      if (e.shiftKey && i <= 0) {
        e.preventDefault()
        list[list.length - 1].focus()
      } else if (!e.shiftKey && (i === list.length - 1 || i < 0)) {
        e.preventDefault()
        list[0].focus()
      }
    }
  })

  function arm() {
    if (!force && gated()) return
    if (force) {
      openPop()
      return
    }
    var shown = false
    var tryOpen = function () {
      if (shown || gated()) return
      shown = true
      openPop()
    }
    setTimeout(tryOpen, 16000)
    var onScroll = function () {
      var max = document.documentElement.scrollHeight - innerHeight
      if (max > 80 && scrollY / max >= 0.5) {
        tryOpen()
        removeEventListener('scroll', onScroll)
      }
    }
    addEventListener('scroll', onScroll, { passive: true })
    if (matchMedia('(hover:hover) and (pointer:fine)').matches) {
      var onOut = function (e) {
        if (e.clientY <= 0) {
          tryOpen()
          document.removeEventListener('mouseout', onOut)
        }
      }
      document.addEventListener('mouseout', onOut)
    }
  }

  var start = function () {
    if ('requestIdleCallback' in window) requestIdleCallback(arm, { timeout: 2500 })
    else setTimeout(arm, 900)
  }
  if (document.readyState === 'complete') start()
  else addEventListener('load', start)
})()
