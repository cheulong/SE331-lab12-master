package camt.cbsd.dao;

import camt.cbsd.entity.Product;

import java.util.List;


public interface ProductDao {
    Product add(Product course);
    List<Product> list();
    Product findById(long id);
    void removeProductById(long id);
    void updateProduct(Product product);
    List<Product> findByProductName(String searchText);

    List<Product> findByDescription(String searchText);


    List<Product> findByPrice(double searchText1, double searchText2);
}
