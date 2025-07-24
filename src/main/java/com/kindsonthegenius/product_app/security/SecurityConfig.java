package com.kindsonthegenius.product_app.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import jakarta.servlet.http.HttpServletResponse;

import java.util.List;
import org.springframework.http.HttpMethod;

@EnableWebSecurity
@Configuration
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Autowired
    private UserDetailsService userDetailsService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                // CSRF 보호 기능 비활성화
                .csrf(AbstractHttpConfigurer::disable)      
                // CORS 설정 기본 설정(다른 도메인에서 요청을 허용)    
                .cors(Customizer.withDefaults())      
                // 로그인 페이지는 모든 사용자가 접근 가능
                // 회원가입 페이지는 모든 사용자가 접근 가능 
                // 나머지 요청은 인증된 사용자만 접근 가능
                .authorizeHttpRequests(auth -> auth                        
                        .requestMatchers(HttpMethod.POST, "/login").permitAll()                        
                        .requestMatchers(HttpMethod.POST, "/register").permitAll()                        
                        .anyRequest().authenticated()
                )
                // formLogin을 사용하지 않고, 인증이 필요할 때 React의 로그인 페이지로 리다이렉트
                .exceptionHandling(exception -> exception
                        .authenticationEntryPoint((request, response, authException) -> {
                            // React 앱의 로그인 페이지로 리다이렉트
                            //response.sendRedirect("http://localhost:3000/login");
                            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
                        })
                )                
                // 기본 인증 설정
                //사용자 이름과 비밀번호를 Base64로 인코딩하여 헤더에 포함시킵니다
                .httpBasic(Customizer.withDefaults())           
                .build();                                       
    }

    @Bean
    public AuthenticationProvider authenticationProvider (){
        // DaoAuthenticationProvider 인스턴스 생성
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        // 사용자 정보를 조회하는 서비스 설정
        provider.setUserDetailsService(userDetailsService);
        // 비밀번호 암호화를 위한 인코더 설정
        provider.setPasswordEncoder(bCryptPasswordEncoder());
        return provider;
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource(){
        // CORS 설정 객체 생성
        CorsConfiguration configuration = new CorsConfiguration();
        // 허용할 출처(Origin) 설정
        // React 애플리케이션이 실행되는 localhost:3000에서의 요청만 허용
        // 다른 도메인에서의 요청은 차단됨
        configuration.setAllowedOrigins(List.of("http://localhost:3000"));
        // 허용할 HTTP 메서드 설정
        // GET, POST, PUT, DELETE 메서드만 허용
        // OPTIONS, PATCH 등의 다른 메서드는 차단됨
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
        // 자격 증명 허용 여부 설정
        // 쿠키, 인증 헤더 등의 인증 정보를 포함한 요청 허용
        configuration.setAllowCredentials(true);
        // 허용할 헤더 설정
        // 모든 헤더를 허용
        configuration.addAllowedHeader("*");
        // URL 패턴에 따라 CORS 설정 적용
        // 모든 경로에 대해 CORS 설정 적용
        // 예: http://localhost:3000/api/users 요청에 대해 CORS 설정 적용
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
