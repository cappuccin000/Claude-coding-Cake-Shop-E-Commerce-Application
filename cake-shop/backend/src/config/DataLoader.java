package com.cakeshop.config;

import com.cakeshop.entity.Product;
import com.cakeshop.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private final ProductRepository productRepository;

    @Override
    public void run(String... args) {
        if (productRepository.count() == 0) {
            loadSampleProducts();
        }
    }

    private void loadSampleProducts() {
        List<Product> products = Arrays.asList(
                Product.builder()
                        .name("Chocolate Fudge Cake")
                        .description("Rich chocolate cake with layers of velvety chocolate fudge frosting")
                        .price(new BigDecimal("45.99"))
                        .category("Chocolate")
                        .imageUrl("https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500")
                        .stockQuantity(20)
                        .available(true)
                        .build(),

                Product.builder()
                        .name("Strawberry Shortcake")
                        .description("Light and fluffy vanilla cake with fresh strawberries and whipped cream")
                        .price(new BigDecimal("39.99"))
                        .category("Fruit")
                        .imageUrl("https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500")
                        .stockQuantity(15)
                        .available(true)
                        .build(),

                Product.builder()
                        .name("Red Velvet Cake")
                        .description("Classic red velvet cake with cream cheese frosting")
                        .price(new BigDecimal("42.99"))
                        .category("Classic")
                        .imageUrl("https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=500")
                        .stockQuantity(18)
                        .available(true)
                        .build(),

                Product.builder()
                        .name("Lemon Drizzle Cake")
                        .description("Zesty lemon cake with tangy lemon glaze")
                        .price(new BigDecimal("35.99"))
                        .category("Citrus")
                        .imageUrl("https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=500")
                        .stockQuantity(25)
                        .available(true)
                        .build(),

                Product.builder()
                        .name("Carrot Cake")
                        .description("Moist carrot cake with cream cheese frosting and walnuts")
                        .price(new BigDecimal("38.99"))
                        .category("Classic")
                        .imageUrl("https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=500")
                        .stockQuantity(12)
                        .available(true)
                        .build(),

                Product.builder()
                        .name("Black Forest Cake")
                        .description("Chocolate sponge cake with cherries and whipped cream")
                        .price(new BigDecimal("48.99"))
                        .category("Chocolate")
                        .imageUrl("https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500")
                        .stockQuantity(10)
                        .available(true)
                        .build(),

                Product.builder()
                        .name("Vanilla Birthday Cake")
                        .description("Classic vanilla cake perfect for celebrations")
                        .price(new BigDecimal("36.99"))
                        .category("Classic")
                        .imageUrl("https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=500")
                        .stockQuantity(30)
                        .available(true)
                        .build(),

                Product.builder()
                        .name("Tiramisu Cake")
                        .description("Italian coffee-flavored cake with mascarpone cream")
                        .price(new BigDecimal("52.99"))
                        .category("Specialty")
                        .imageUrl("https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500")
                        .stockQuantity(8)
                        .available(true)
                        .build());

        productRepository.saveAll(products);
    }
}