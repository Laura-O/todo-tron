<template>
  <div class="settings-wrapper">
      <div class="single-setting-wrapper">
        <div class="settings-header"><p>Path to todo-txt file:</p> {{path}}</div>
        <button class="button is-primary is-small" @click="setPath">Change path</button>        
      </div>
      <div class="single-setting-wrapper">
        <div class="settings-header"><p>Default slot length per task:</p> {{defaultSeconds}}</div>
        <b-field grouped v-if="!showSecondsForm">    
            <p class="control">                
                <button class="button is-primary is-small" @click="toggleSeconds">Change time</button>
            </p>
        </b-field>
         <b-field grouped v-else>
            <b-input class="is-small" type="number" v-model.number="newSeconds"></b-input>
            <p class="control">                
                <button class="button is-primary is-small" @click="saveSeconds">Save</button>
            </p>
        </b-field>
      </div>
      <div class="single-setting-wrapper">
        <div class="settings-header"><p>Show remaining time in menubar:</p></div>
        <div class="block">
            <b-radio v-model="defaultTrayTime"
                native-value="ms">
                Minutes:Seconds 
            </b-radio>
            <b-radio v-model="defaultTrayTime"
                native-value="mm">
                Minutes only
            </b-radio>
            <b-radio v-model="defaultTrayTime"
                native-value="none">
                None
            </b-radio>
        </div>
      </div>
  <div>

  </div>
  </div>
</template>

<script>
export default {
    name: 'settings',
    data() {
        return {
            showSecondsForm: false,
            newSeconds: this.$store.state.Settings.defaultSeconds,
        };
    },
    components: {},
    computed: {
        path: {
            set(value) {
                this.$store.commit('changePath', value);
            },
            get() {
                return this.$store.state.Settings.path;
            },
        },
        defaultSeconds: {
            set(value) {
                this.$store.commit('changeDefaultSeconds', value * 60);
            },
            get() {
                return this.$store.state.Settings.defaultSeconds / 60;
            },
        },
        defaultTrayTime: {
            set(defaultTrayTime) {
                this.$store.commit('changeDefaultTrayTime', defaultTrayTime);
            },
            get() {
                return this.$store.state.Settings.defaultTrayTime;
            },
        },
    },
    methods: {
        saveSeconds() {
            this.$store.commit('changeDefaultSeconds', this.newSeconds * 60);
            this.toggleSeconds();
        },
        toggleSeconds() {
            this.showSecondsForm = !this.showSecondsForm;
        },
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
  height: 477px;
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

.settings-header p {
  font-size: 16px;
  font-weight: 900;
}

.control-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
