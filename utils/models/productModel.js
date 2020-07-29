const utils=require('../utils-functions');

/**
 * class to describe a product
 */
class ProductModel {

    name;
    description;
    price;
    imagePath;
    variants=[];
    id;
    parentCategory;

    /**
     * Constructs the class
     * @param {Object}product the object with the attributes to construct the class
     */
    constructor(product) {
        this.id=product.id;
        this.name = product.name;
        this.description= product.page_description;
        this.price=product.price;
        this.imagePath=utils.getImgPath(product, 0,'large');
        this.variants=getVariants(product);
        this.parentCategory=product.primary_category_id;
    }

}

function getVariants(product) {
    let variantAtributes= new Map();
    product.variation_attributes.forEach((item)=>{
        item.values.forEach((item2)=>{
            variantAtributes.set(item2.value,item2.name);
        })
    });

    let imageVariants=new Map();
    product.image_groups.forEach((image_grup)=>{
        if(image_grup.hasOwnProperty('variation_value'))
            if(image_grup.view_type==='small')
                imageVariants.set(image_grup['variation_value'],image_grup.images[0].link);
    })
    let variants=[];
    product.variants.forEach((item)=>{
        let variant={
            title:'',
            inStock:item.orderable,
            id:item.product_id,
            image:''
        };
        for( const property in item.variation_values){
            if(item.variation_values.hasOwnProperty(property)){
                variant.title+=property+': '+variantAtributes.get(item.variation_values[property])+'   ';
                if(undefined!==imageVariants.get(item.variation_values[property]))
                    variant.image=imageVariants.get(item.variation_values[property])
            }

        }
        variant.title+=' Price: '+item.price;
        variants.push(variant);
    });
    return variants;
}

/**
 * Class for describing a product for the cart
 */
class ProductCartModel {

    name;
    description;
    price;
    imagePath;
    atributes;
    productID;
    variantID;
    parentCategory;
    quantity;


    /**
     * constructs the class
     * @param {Object}product the original base product object
     * @param {Object}poroductVariant the specific varinat object  of the product
     */
    constructor(product, poroductVariant) {
        this.productID=product.id;
        this.variantID=poroductVariant.variant.product_id;
        this.name = product.name;
        this.description= product.page_description;
        this.price=parseFloat(poroductVariant.variant.price)*parseFloat(poroductVariant.quantity);
        this.quantity=poroductVariant.quantity;

        this.imagePath=utils.getImgPath(product, 0,'medium');
        this.parentCategory=product.primary_category_id;
        this.atributes=getAtributesList(product,poroductVariant);
    }

}

function getAtributesList(product,pVarinat) {
    let variantAtributes= new Map();
    product.variation_attributes.forEach((item)=>{
        item.values.forEach((item2)=>{
            variantAtributes.set(item2.value,item2.name);
        })
    });
    let list=new Map();
        for( const property in pVarinat.variant.variation_values){
            if(pVarinat.variant.variation_values.hasOwnProperty(property))
                list.set(property, variantAtributes.get(pVarinat.variant.variation_values[property]));
        }

    return list;
}
exports.ProductModel=ProductModel;
exports.ProductCartModel=ProductCartModel;