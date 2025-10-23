// vaadin-com-generator:exclude
/*
    The line above is a marker for the vaadin.com/start page .zip file generator.
    It ensures that this file is excluded from the generated project package.
*/
package com.vaadin.starter.bakery.app.security;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.SecurityFilterChain;

import com.vaadin.flow.spring.security.VaadinAwareSecurityContextHolderStrategyConfiguration;
import com.vaadin.starter.bakery.backend.data.Role;



/**
 * Allows accessing all views without login for performance testing.
 */
@Configuration
@Order(1)
@Profile("performance-test")
@Import(VaadinAwareSecurityContextHolderStrategyConfiguration.class)
public class PerformanceTestSecurityConfiguration {

    @Bean
    public SecurityFilterChain performanceSecurityFilterChain(HttpSecurity http) throws Exception {
        return http
            // Not using Spring CSRF here to be able to use plain HTML for the login page
            .csrf(csrf -> csrf.disable())

            // Allow all requests by anonymous users
            .authorizeHttpRequests(authz -> authz
                .anyRequest().permitAll()
            )

            // Define the anonymous user with custom principal and roles
            .anonymous(anon -> anon
                .principal(new User("admin@vaadin.com", "",
                    List.of(new SimpleGrantedAuthority("admin"))))
                .authorities(Arrays.stream(Role.getAllRoles())
                    .map(SimpleGrantedAuthority::new)
                    .collect(Collectors.toList()))
            ).build();
    }

}