<template>
  <p class="small">
    дневная зона (с 7 до 23 часов):
    <span class="number"> {{ inRubDay }} </span> руб.
    <button @click="addDay">+</button>
  </p>
  <p class="small">
    ночная зона (с 23 до 7 часов) :
    <span class="number"> {{ inRubNight }} </span> руб.
    <button @click="addNight">+</button>
  </p>
  <p class="small">
    среднее : <span class="number"> {{ inRubAv }} </span> руб.
    <button @click="addAv">+</button>
  </p>
  <label>
    <input ref="myinput" v-model="kwt" type="text" maxlength="5" />
    кВт</label
  >
  <label> <input v-model="wt" type="text" maxlength="5" /> Вт</label>
  <div class="hello">
    <h3>{{ msg }}</h3>
  </div>
  <div class="summ">
    <h3>
      Сумма: <span class="number"> {{ summObj }}</span> руб.
    </h3>
  </div>
  <p><button v-if="isHistory" @click="clear">X</button> История:</p>
  <div v-for="(data, index) in history" :key="index">
    Время суток: <b> {{ data.value }}</b> Сумма: <b>{{ data.rub }}</b>
  </div>
</template>

<script>
export default {
  inject: ["GStore"],
  name: "Calc",
  props: {
    msg: String,
  },
  data() {
    return {
      history: [],
      kwt: "",
      wt: "",
      day: 5.29,
      night: 2.11,
    };
  },
  methods: {
    saveToLocalStorage() {
      localStorage.setItem("history", JSON.stringify(this.history));
    },
    loadFromLocalStorage() {
      if (localStorage.getItem("history")) {
        this.history = JSON.parse(localStorage.getItem("history"));
      }
    },
    addDay() {
      if (this.kwt > 0 && this.kwt !== "") {
        const dayObj = { value: "День", rub: this.inRubDay };
        this.history.unshift(dayObj);
        this.saveToLocalStorage();
        this.$refs.myinput.focus();
        this.kwt = "";
      }
    },
    addNight() {
      if (this.kwt > 0 && this.kwt !== "") {
        const nightObj = { value: "Ночь", rub: this.inRubNight };
        this.history.unshift(nightObj);
        this.saveToLocalStorage();
        this.$refs.myinput.focus();
        this.kwt = "";
      }
    },
    addAv() {
      if (this.kwt > 0 && this.kwt !== "") {
        const avObj = { value: "Среднее", rub: this.inRubAv };
        this.history.unshift(avObj);
        this.saveToLocalStorage();
        this.$refs.myinput.focus();
        this.kwt = "";
      }
    },
    clear() {
      this.history = [];
      this.saveToLocalStorage();
      this.GStore.flashMessage = "История очищена";
      setTimeout(() => {
        this.GStore.flashMessage = "";
      }, 3000);
    },
  },
  computed: {
    isHistory() {
      return this.history.length !== 0;
    },
    inRubDay() {
      let x = this.kwt * this.day;
      if (!isNaN(x)) {
        return x.toFixed(2);
      } else {
        return 0;
      }
    },
    inRubNight() {
      let x = this.kwt * this.night;
      if (!isNaN(x)) {
        return x.toFixed(2);
      } else {
        return 0;
      }
    },
    inRubAv() {
      let x = (this.kwt * (this.night + this.day)) / 2;
      if (!isNaN(x)) {
        return x.toFixed(2);
      } else {
        return 0;
      }
    },
    summObj() {
      const summ = this.history.reduce((accumulator, value) => {
        return accumulator + Number(value.rub);
      }, 0);
      return summ.toFixed(2);
    },
  },
  watch: {
    kwt: function (kwt) {
      if (!isNaN(kwt) && kwt !== "") {
        return (this.wt = kwt * 1000);
      } else if (kwt !== "") {
        this.GStore.flashMessage = "Вводите только цифры";
        setTimeout(() => {
          this.GStore.flashMessage = "";
        }, 3000);
        return (this.wt = "");
      } else {
        return (this.wt = "");
      }
    },
    wt: function (wt) {
      if (!isNaN(wt) && wt !== "") {
        return (this.kwt = wt / 1000);
      } else if (wt !== "") {
        this.GStore.flashMessage = "Вводите только цифры";
        setTimeout(() => {
          this.GStore.flashMessage = "";
        }, 3000);
        return (this.wt = "");
      } else {
        return (this.wt = "");
      }
    },
  },
  created() {
    this.loadFromLocalStorage();
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a,
.number {
  font-size: 1.5rem;
  color: #42b983;
}
.small {
  font-size: 1rem;
}
p {
  display: block;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}
input {
  margin-top: 20px;
}
.summ {
  margin-top: 20px;
}
button {
  margin-left: 20px;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
