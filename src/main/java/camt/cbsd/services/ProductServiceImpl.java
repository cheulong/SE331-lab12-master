package camt.cbsd.services;

import camt.cbsd.dao.ProductDao;
import camt.cbsd.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;


@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    public void setProductDao(ProductDao productDao) {
        this.productDao = productDao;
    }

    ProductDao productDao;
    String urlPath;

    @Override
    public List<Product> list() {
        return productDao.list();
    }

    public List<Product> addUrlPicture(List<Product> products) {
        for (Product product : products) {
            product.setImage(urlPath + "product/image/" + product.getImage());
        }
        return products;
    }
    @Override
    public Product add(Product product) {
        return productDao.add(product);
    }

    @Override
    @Transactional
    public Product findById(long id){
        Product product = productDao.findById(id);

        return product;
    }

    @Override
    @Transactional
    public void removeProductById(long id){
        this.productDao.removeProductById(id);
    }
    @Override
    @Transactional
    public void updateProduct( Product product){ this.productDao.updateProduct(product);
    }
    @Override
    @Transactional
    public List<Product> queryProduct(String query){
        if(query==null||query.equals(""))
            return productDao.list();
        return productDao.findByProductName(query);
    }
    @Override
    @Transactional
    public List<Product> queryProductByDes(String query){
        if(query==null||query.equals(""))
            return productDao.list();
        return productDao.findByDescription(query);
    }
    @Override
    @Transactional
    public List<Product> queryProductPrice(double query1,double query2){
        return productDao.findByPrice(query1,query2);
    }

}
