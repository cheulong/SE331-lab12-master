package camt.cbsd.services;

import camt.cbsd.entity.Product;

import javax.transaction.Transactional;
import java.util.List;


public interface ProductService {
    List<Product> list();
    Product add(Product course);
    Product findById(long id);

    @Transactional
    void removeProductById(long id);

    @Transactional
    void updateProduct(Product product);

    @Transactional
    List<Product> queryProduct(String query);

    @Transactional
    List<Product> queryProductByDes(String query);



    @Transactional
    List<Product> queryProductPrice(double query1, double query2);
}
