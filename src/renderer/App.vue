<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
    <footer class="is-dark"><timer></timer></footer>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import fontawesome from '@fortawesome/fontawesome';
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';

import Navbar from './components/Navbar';
import Timer from './components/Timer';

fontawesome.library.add(faSpinner);
const storage = require('electron').remote.require('electron-settings');

export default {
    name: 'electron-todo-txt',
    components: { Navbar, Timer, FontAwesomeIcon },
    created() {
        if (storage.has('path')) {
            const path = storage.get('path');
            this.$store.commit('changePath', path);
        }
    },
};
</script>


<style lang="scss">
@import '~bulma/sass/utilities/_all';

// Set your colors
//$primary: #f84aa7;
$primary: #01d5da;
$primary-invert: findColorInvert($primary);
$twitter: #00a6fb;
$twitter-invert: findColorInvert($twitter);

$dark: #2d2f31;
$dark-invert: findColorInvert($dark);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
    'white': ($white, $black),
    'black': ($black, $white),
    'light': ($light, $light-invert),
    'dark': ($dark, $dark-invert),
    'primary': ($primary, $primary-invert),
    'info': ($info, $info-invert),
    'success': ($success, $success-invert),
    'warning': ($warning, $warning-invert),
    'danger': ($danger, $danger-invert),
    'twitter': ($twitter, $twitter-invert)
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

$table-cell-border-width: 0 0 0;
$box-radius: 5px;

$navbar-height: 1rem;

@import '~bulma';
@import '~buefy/src/scss/buefy';

::-webkit-scrollbar {
    display: none;
}

#app {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.table.is-scrollable tbody {
    overflow-y: scroll;
}

// .main-wrapper {
//     background-color: #2d2f31;
// }

footer {
    background-color: #2d2f31;
    // position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
}

.green-glow {
    color: #01d5da;
}

.selected-wrapper {
    background-color: #2d2f31;
}

.list {
    background-color: #2d2f31;
    padding-bottom: 5px;
}
</style>
