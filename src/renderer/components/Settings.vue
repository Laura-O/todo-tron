<template>
  <div class="settings-wrapper">
      <div class="single-setting-wrapper">
        <div>Path to todo-txt file: {{path}}</div>
        <button class="button is-primary is-small" @click="setPath">Choose file</button>        
      </div>
      <div class="single-setting-wrapper">
        <div>Task length</div>
        <div class="control-wrapper">
            <input class="input is-small" type="number" placeholder="Disabled input" disabled>
            <button @click="setPath">Button</button>
        </div>
      </div>
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
.settings-wrapper {
    height: 500px;
    background-color: #2d2f31;
    color: white;
    padding: 15px;
}

.single-setting-wrapper {
    margin-bottom: 15px;
    padding: 10px;
    border: 1px solid #01d5da;
    border-radius: 5px;
}

.control-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
</style>
