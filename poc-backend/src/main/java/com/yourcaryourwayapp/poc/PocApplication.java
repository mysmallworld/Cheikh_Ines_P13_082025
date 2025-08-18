package com.yourcaryourwayapp.poc;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PocApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(PocApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("Welcome to Your Car Your Way App !");
	}
}
