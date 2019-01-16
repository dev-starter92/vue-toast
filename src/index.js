import { install, Vue } from './install'

export default class VueToast {
  static install
  static version

  constructor (options = {}) {
    if (!Vue && typeof window !== 'undefined' && window.Vue) {
      install(window.Vue)
    }

    this.toast = null
    this.description = ''
    this.title = ''
    this.duration = 2.0
    this.image = ''

    /**
     * Toast enabled & disabled visible effect.
     * @type {string} fade, slide
     */
    this.effect = 'fade'
    this.completion = null

    this.defaultMessage = 'Please enter your text.'

    return {
      open: ({
        description = '',
        title = this.defaultMessage,
        duration = 2.0,
        completion
      }) => {
      this.__set({ description, title, duration, completion })
      this.__open()
    }
  }
  }

  // Create a tag under body for toast to use.
  __makeToast () {
    const div = document.createElement('div')
    const title = document.createElement('div')
    const description = document.createElement('div')

    div.setAttribute('id', 'toast')
    title.setAttribute('id', 'title')
    description.setAttribute('id', 'description')

    div.appendChild(title)
    div.appendChild(description)

    document.body.insertBefore(div, document.body.childNodes[0]);

    return div
  }

  __checkToast () {
    if (!this.toast) {
      const e = document.querySelector("#toast")
      this.toast = e ? e : this.__makeToast()
    }
    return true
  }

  __set ({
           description,
           title,
           duration,
           completion
         }) {
    this.description = description
    this.title = title
    this.duration = duration
    this.completion = completion && typeof completion === 'function' ? completion : null
  }

  __open () {
    // Make sure you have a toast-only dome.
    // If not, create a dome below the body.
    if (!this.__checkToast()) {
      this.__makeToast()
    }

    const x = this.toast

    // Add the "show" class to DIV
    x.style['animation'] = x.style['-webkit-animation'] = this.effect + 'in 0.5s, ' + this.effect + 'out 0.5s ' + (this.duration - 0.5) + 's'
    x.classList.add('show')
    x.querySelector('#title').innerText = this.title
    x.querySelector('#description').innerText = this.description

    // After 3 seconds, remove the show class from DIV
    setTimeout(function() {
      x.classList.remove('show')
      x.style['animation'] = x.style['-webkit-animation'] = ''
    }, this.duration * 1000)
  }
}

VueToast.install = install
VueToast.version = '__VERSION__'
