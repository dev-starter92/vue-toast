import VueToast from './index'

export let Vue

export function install (_Vue) {
    Vue = _Vue

    if (install.installed) {
        console.log('already installed.')
        return
    }

    install.installed = true

    Vue.prototype.$toast = new VueToast()
}
