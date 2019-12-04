export const globalState = {
   data: {},
   set(data) {
       this.data = {
        ...this.data,
        ...data
       }
   },
   getData () {
       return this.data;
   }
}