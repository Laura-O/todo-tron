<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
    <footer><timer></timer></footer>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import fontawesome from '@fortawesome/fontawesome';
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';

import Navbar from './components/Navbar';
import Timer from './components/Timer';

fontawesome.library.add(faSpinner);

export default {
    name: 'electron-todo-txt',
    components: { Navbar, Timer, FontAwesomeIcon },
};
</script>


<style lang="scss">
@import '~bulma/sass/utilities/_all';

// Set your colors
$primary: #ff1744;
$primary-invert: findColorInvert($primary);
$twitter: #4099ff;
$twitter-invert: findColorInvert($twitter);

$dark: #212121;
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

@import '~bulma';
@import '~buefy/src/scss/buefy';

.table.is-scrollable tbody {
    overflow-y: scroll;
}

.main-wrapper {
    height: 100%;
}
</style>
