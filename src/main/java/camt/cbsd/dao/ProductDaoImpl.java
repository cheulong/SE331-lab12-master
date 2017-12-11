package camt.cbsd.dao;

import camt.cbsd.entity.Product;
import camt.cbsd.repository.ProductRepository;
import jersey.repackaged.com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public class ProductDaoImpl implements ProductDao {
    ProductRepository productRepository;
    @Autowired
    public void setProductRepository(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public Product add(Product course) {
        return productRepository.save(course);
    }

    @Override
    public List<Product> list() {
        return Lists.newArrayList(productRepository.findAll());
    }

    @Override
    public Product findById(long id) {
        return productRepository.findOne(id);
    }

    @Override
    public void removeProductById(long id){
        productRepository.delete(id);
    }
    @Override
    public void updateProduct(Product product){
        productRepository.save(product);
    }
    @Override
    public List<Product> findByProductName(String searchText){
        return productRepository.findByProductNameIgnoreCaseContaining(searchText);
    }
    @Override
    public List<Product> findByDescription(String searchText){
        return productRepository.findByDescriptionIgnoreCaseContaining(searchText);
    }
    @Override
    public List<Product> findByPrice(double searchText1,double searchText2){
        return productRepository.findByProductPriceBetween(searchText1,searchText2);
    }

    }




