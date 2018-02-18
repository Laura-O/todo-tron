<template>
  <div id="wrapper">    
      <button @click="setPath">Button</button>
      {{path}}
  <div>

  </div>
  </div>
</template>

<script>
export default {
    name: 'settings',
    components: {},
    computed: {
        path: {
            set(value) {
                this.$store.commit('addPath', value);
            },
            get() {
                return this.getPath();
            },
        },
    },
    methods: {
        getPath() {
            const settings = require('electron').remote.require('electron-settings');
            return settings.get('path');
        },
        setPath() {
            const dialog = this.$electron.remote.dialog;
            dialog.showOpenDialog(
                {
                    filters: [
                        {
                            name: 'Documents',
                            extensions: ['txt', 'md'],
                        },
                    ],
                    properties: ['openFile'],
                },
                (item) => {
                    if (item) {
                        this.$store.commit('changePath', item[0]);
                    }
                },
            );
        },
    },
};
</script>

<style>

</style>
