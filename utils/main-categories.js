var mainCategories=[];
const category=require('../data/get-categories');
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