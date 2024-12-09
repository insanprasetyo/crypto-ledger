"use strict";(self["webpackChunkcrypto_ledger"]=self["webpackChunkcrypto_ledger"]||[]).push([[844],{5844:function(e,t,a){a.r(t),a.d(t,{default:function(){return P}});var r=a(641),l=a(3751),o=a(33);const n={class:"container"},s={class:"mb-3"},i={class:"mb-3"},u={class:"mb-3"},d={class:"mb-3"},c={class:"mb-3"},m={class:"mb-3"},p={key:0,class:"mt-4"},h={class:"table"};function f(e,t,a,f,b,g){return(0,r.uX)(),(0,r.CE)("div",n,[t[16]||(t[16]=(0,r.Lk)("h1",null,"Compound Trading Calculator",-1)),(0,r.Lk)("form",{onSubmit:t[6]||(t[6]=(0,l.D$)(((...e)=>g.calculateResults&&g.calculateResults(...e)),["prevent"]))},[(0,r.Lk)("div",s,[t[7]||(t[7]=(0,r.Lk)("label",{for:"principal",class:"form-label"},"Modal Awal",-1)),(0,r.bo)((0,r.Lk)("input",{type:"number",id:"principal",class:"form-control","onUpdate:modelValue":t[0]||(t[0]=e=>b.principal=e),required:""},null,512),[[l.Jo,b.principal]])]),(0,r.Lk)("div",i,[t[8]||(t[8]=(0,r.Lk)("label",{for:"tradingPerDay",class:"form-label"},"Trades Per Day",-1)),(0,r.bo)((0,r.Lk)("input",{type:"number",id:"tradingPerDay",class:"form-control","onUpdate:modelValue":t[1]||(t[1]=e=>b.tradingPerDay=e),required:""},null,512),[[l.Jo,b.tradingPerDay]])]),(0,r.Lk)("div",u,[t[9]||(t[9]=(0,r.Lk)("label",{for:"tradingPerWeek",class:"form-label"},"Trades Per Week (biasanya 5 hari seminggu)",-1)),(0,r.bo)((0,r.Lk)("input",{type:"number",id:"tradingPerWeek",class:"form-control","onUpdate:modelValue":t[2]||(t[2]=e=>b.tradingPerWeek=e),required:""},null,512),[[l.Jo,b.tradingPerWeek]])]),(0,r.Lk)("div",d,[t[10]||(t[10]=(0,r.Lk)("label",{for:"percentage",class:"form-label"},"Keuntungan yg diharapkan Per Trade (dalam percent)",-1)),(0,r.bo)((0,r.Lk)("input",{type:"number",id:"percentage",class:"form-control","onUpdate:modelValue":t[3]||(t[3]=e=>b.percentage=e),step:"0.01",required:""},null,512),[[l.Jo,b.percentage]])]),(0,r.Lk)("div",c,[t[11]||(t[11]=(0,r.Lk)("label",{for:"months",class:"form-label"},"Jumlah Bulan",-1)),(0,r.bo)((0,r.Lk)("input",{type:"number",id:"months",class:"form-control","onUpdate:modelValue":t[4]||(t[4]=e=>b.numberOfMonths=e),required:""},null,512),[[l.Jo,b.numberOfMonths]])]),(0,r.Lk)("div",m,[t[12]||(t[12]=(0,r.Lk)("label",{for:"takeProfitPercentage",class:"form-label"},"Keuntungan yg akan diambil perbulan (dalam percent)",-1)),(0,r.bo)((0,r.Lk)("input",{type:"number",id:"takeProfitPercentage",class:"form-control","onUpdate:modelValue":t[5]||(t[5]=e=>b.takeProfitPercentage=e),placeholder:"Enter percentage (e.g., 50 for 50%)",required:""},null,512),[[l.Jo,b.takeProfitPercentage]])]),t[13]||(t[13]=(0,r.Lk)("button",{type:"submit",class:"btn btn-primary"},"Hitung",-1))],32),b.results.length?((0,r.uX)(),(0,r.CE)("div",p,[t[15]||(t[15]=(0,r.Lk)("h3",null,"Results",-1)),(0,r.Lk)("table",h,[t[14]||(t[14]=(0,r.Lk)("thead",null,[(0,r.Lk)("tr",null,[(0,r.Lk)("th",{scope:"col"},"Bulan"),(0,r.Lk)("th",{scope:"col"},"Modal"),(0,r.Lk)("th",{scope:"col"},"Total Compound"),(0,r.Lk)("th",{scope:"col"},"Margin"),(0,r.Lk)("th",{scope:"col"},"Take Profit"),(0,r.Lk)("th",{scope:"col"},"Tambahan Modal")])],-1)),(0,r.Lk)("tbody",null,[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(b.results,((e,t)=>((0,r.uX)(),(0,r.CE)("tr",{key:t},[(0,r.Lk)("td",null,(0,o.v_)(t+1),1),(0,r.Lk)("td",null,(0,o.v_)(g.formatNumber(e.initialCapital)),1),(0,r.Lk)("td",null,(0,o.v_)(g.formatNumber(e.totalCompound)),1),(0,r.Lk)("td",null,(0,o.v_)(g.formatNumber(e.margin)),1),(0,r.Lk)("td",null,(0,o.v_)(g.formatNumber(e.takeProfit)),1),(0,r.Lk)("td",null,(0,o.v_)(g.formatNumber(e.additionalCapital)),1)])))),128))])]),(0,r.Lk)("div",null,[(0,r.Lk)("p",null,"Total Profit (yang diambil) dalam "+(0,o.v_)(b.numberOfMonths)+" Bulan: "+(0,o.v_)(g.formatNumber(b.totalProfit)),1),(0,r.Lk)("p",null,[(0,r.Lk)("small",null,"("+(0,o.v_)(g.toWords(b.totalProfit))+")",1)])])])):(0,r.Q3)("",!0)])}a(4114);var b={data(){return{principal:0,tradingPerDay:8,tradingPerWeek:5,percentage:0,numberOfMonths:12,takeProfitPercentage:50,results:[],totalProfit:0}},methods:{calculateResults(){let e=this.principal;const t=this.tradingPerDay,a=this.tradingPerWeek,r=this.percentage/100;this.results=[],this.totalProfit=0;for(let l=1;l<=this.numberOfMonths;l++){let l=e,o=e;for(let e=0;e<20;e++)o+=o*(t*r);for(let e=0;e<4;e++)o+=o*(a*r);let n=o-l,s=n*(this.takeProfitPercentage/100),i=l+(n-s);this.results.push({initialCapital:this.roundToNearestThousand(l),totalCompound:this.roundToNearestThousand(o),margin:this.roundToNearestThousand(n),takeProfit:this.roundToNearestThousand(s),additionalCapital:this.roundToNearestThousand(i)}),this.totalProfit+=this.roundToNearestThousand(s),e=this.roundToNearestThousand(i)}this.saveToLocalStorage()},saveToLocalStorage(){const e={principal:this.principal,tradingPerDay:this.tradingPerDay,tradingPerWeek:this.tradingPerWeek,percentage:this.percentage,numberOfMonths:this.numberOfMonths,takeProfitPercentage:this.takeProfitPercentage,results:this.results,totalProfit:this.totalProfit};localStorage.setItem("compoundCalculatorData",JSON.stringify(e))},loadFromLocalStorage(){const e=localStorage.getItem("compoundCalculatorData");if(e){const t=JSON.parse(e);this.principal=t.principal,this.tradingPerDay=t.tradingPerDay,this.tradingPerWeek=t.tradingPerWeek,this.percentage=t.percentage,this.numberOfMonths=t.numberOfMonths,this.takeProfitPercentage=t.takeProfitPercentage,this.results=t.results,this.totalProfit=t.totalProfit}},roundToNearestThousand(e){return 1e3*Math.floor(e/1e3)},formatNumber(e){return(new Intl.NumberFormat).format(e)},toWords(e){const t=["","satu","dua","tiga","empat","lima","enam","tujuh","delapan","sembilan","sepuluh","sebelas","dua belas","tiga belas","empat belas","lima belas","enam belas","tujuh belas","delapan belas","sembilan belas"],a=["","ribu","juta","milyar","triliun"];let r="",l=0;if(100===e)return"seratus";do{let o=e%1e3;if(0!==o){let e="";Math.floor(o/100)>0&&(1===Math.floor(o/100)&&0===l?e+="seratus ":e+=t[Math.floor(o/100)]+" ratus "),o%=100,o>0&&(o<20?e+=t[o]:(e+=t[Math.floor(o/10)]+" puluh ",o%10>0&&(e+=t[o%10]))),r=e+" "+a[l]+" "+r}e=Math.floor(e/1e3),l++}while(e>0);return r.trim()}},mounted(){this.loadFromLocalStorage()},watch:{principal:"saveToLocalStorage",tradingPerDay:"saveToLocalStorage",tradingPerWeek:"saveToLocalStorage",percentage:"saveToLocalStorage",numberOfMonths:"saveToLocalStorage",takeProfitPercentage:"saveToLocalStorage"}},g=a(6262);const k=(0,g.A)(b,[["render",f],["__scopeId","data-v-73036bb0"]]);var P=k}}]);
//# sourceMappingURL=844.6f139a60.js.map