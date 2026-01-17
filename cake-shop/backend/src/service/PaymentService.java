package com.cakeshop.service;

import com.cakeshop.dto.PaymentRequest;
import com.cakeshop.dto.PaymentResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final OrderService orderService;

    /**
     * Mock payment processing - simulates a payment gateway
     * In production, integrate with Stripe, PayPal, etc.
     */
    public PaymentResponse processPayment(PaymentRequest request) {
        try {
            // Simulate payment processing delay
            Thread.sleep(1000);

            // Generate mock payment intent ID
            String paymentIntentId = "pi_" + UUID.randomUUID().toString().replace("-", "");

            // Simulate payment validation
            if (request.getCardNumber() != null && request.getCardNumber().startsWith("4242")) {
                // Update order with payment information
                orderService.updatePaymentIntent(request.getOrderId(), paymentIntentId);

                return PaymentResponse.builder()
                        .paymentIntentId(paymentIntentId)
                        .status("succeeded")
                        .message("Payment processed successfully")
                        .orderId(request.getOrderId())
                        .build();
            } else {
                return PaymentResponse.builder()
                        .paymentIntentId(paymentIntentId)
                        .status("failed")
                        .message("Payment failed - invalid card")
                        .orderId(request.getOrderId())
                        .build();
            }

        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            return PaymentResponse.builder()
                    .status("error")
                    .message("Payment processing error")
                    .orderId(request.getOrderId())
                    .build();
        } catch (Exception e) {
            return PaymentResponse.builder()
                    .status("error")
                    .message("Payment processing error: " + e.getMessage())
                    .orderId(request.getOrderId())
                    .build();
        }
    }
}