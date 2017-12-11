package camt.cbsd.controller;

import camt.cbsd.entity.Product;
import camt.cbsd.services.ProductService;
import lombok.Value;
import org.apache.commons.io.FilenameUtils;

import java.io.File;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;
import javax.imageio.ImageIO;
import javax.ws.rs.*;

import javax.ws.rs.core.Response;
import java.awt.image.BufferedImage;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;

import java.time.LocalTime;
import java.util.List;


@RestController
@ConfigurationProperties(prefix = "server")

public class ProductController {

    ProductService productService;
    String imageServerDir;
    String imageUrl;
    String baseUrl;

    public void setBaseUrl(String baseUrl) {
        this.baseUrl = baseUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void setImageServerDir(String imageServerDir) {
        this.imageServerDir = imageServerDir;
    }

    @Autowired
    public void setProductService(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/product")
    public List<Product> getProducts() {
        List<Product> products = productService.list();
        return products;
    }


    @PostMapping("/product/image")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        try {
            BufferedImage img = ImageIO.read(file.getInputStream());
            String oldFilename = file.getOriginalFilename();
            String ext = FilenameUtils.getExtension(oldFilename);
            String newFilename = Integer.toString(LocalTime.now().hashCode(), 16) + Integer.toString(oldFilename.hashCode(), 16) + "." + ext;
            File targetFile = Files.createFile(Paths.get(imageServerDir + newFilename)).toFile();
            ImageIO.write(img, ext, targetFile);

            return ResponseEntity.ok(baseUrl + imageUrl + newFilename);
        } catch (NullPointerException e) {
            return ResponseEntity.status(202).build();
        }
    }
    @GetMapping(
            value = "/product/images/{fileName:.+}",
            produces = {MediaType.IMAGE_GIF_VALUE, MediaType.IMAGE_JPEG_VALUE,MediaType.IMAGE_PNG_VALUE})
    public @ResponseBody
    ResponseEntity<?> getProductImage(@PathVariable("fileName") String filename) {
        Path pathFile = Paths.get(imageServerDir + filename);

        try {
            Resource resource = new UrlResource(pathFile.toUri());
            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                        .body(resource);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

    }

    @GetMapping("/product/{id}")
    public ResponseEntity<?> getProduct(@PathVariable("id") long id) {
        Product product = productService.findById(id);
        if (product != null)
            return ResponseEntity.ok(product);
        else
            //http code 204
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();

    }

    @PostMapping("/product")
    public ResponseEntity<?> addProduct(@RequestBody Product product) {
        productService.add(product);
        return ResponseEntity.ok(product);
    }

    @DeleteMapping("/product/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable("id") long id) {
        productService.removeProductById(id);
        return ResponseEntity.ok(productService.list());
    }


    @PostMapping("/product/{id}")
    public ResponseEntity<?> updateProduct(@RequestBody Product product) {
        productService.updateProduct(product);
        return ResponseEntity.ok(productService.list());
    }

    @GetMapping("product/search/name/{search}")
    public ResponseEntity<?> queryProduct1(@PathVariable("search") String query) {
        List<Product> products = productService.queryProduct(query);
        if (products != null)
            return ResponseEntity.ok(products);
        else
            //http code 204
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("product/search/des/{search}")
    public ResponseEntity<?> queryProduct2(@PathVariable("search") String query) {
        List<Product> products = productService.queryProductByDes(query);
        if (products != null)
            return ResponseEntity.ok(products);
        else
            //http code 204
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("product/search/price/{search1}/{search2}")
    public ResponseEntity<?> queryProduct3(@PathVariable("search1") double query1, @PathVariable("search2") double query2) {
        List<Product> products = productService.queryProductPrice(query1, query2);
        if (products != null)
            return ResponseEntity.ok(products);
        else
            //http code 204
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
