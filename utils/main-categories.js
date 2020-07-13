var mainCategories=[];
const category=require('../APIdata/get-categories');
module.exports = {
    mainCategories,
    define: () => {
        try {
             category.getAllCategories();
        }catch (e) {

        }
    },
    update:()=>{
        setTimeout(() => this.define(),
        600000);
    }
};