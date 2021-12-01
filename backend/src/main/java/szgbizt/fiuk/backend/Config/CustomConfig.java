package szgbizt.fiuk.backend.Config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;
import szgbizt.fiuk.backend.Auth.AuthTokenWebResolver;

import java.util.List;

@Configuration
public class CustomConfig extends WebMvcConfigurationSupport {

    @Bean
    public HandlerMethodArgumentResolver authWebArgumentResolverFactory() {
            return new AuthTokenWebResolver();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

            // Addding the AuthWebResolver to the default argument resolvers
            @Override
            public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers ) {
            argumentResolvers.add(authWebArgumentResolverFactory());
            }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry
        .addMapping("/**")
        .allowedOrigins("*")
        .allowedMethods("GET", "DELETE", "PATCH", "POST", "PUT");
        }
/*
    public MappingJackson2HttpMessageConverter jacksonMessageConverter(){
        MappingJackson2HttpMessageConverter messageConverter = new MappingJackson2HttpMessageConverter();

        ObjectMapper mapper = new ObjectMapper();
        //Registering Hibernate4Module to support lazy objects
        mapper.registerModule(new Hibernate5Module());

        messageConverter.setObjectMapper(mapper);
        return messageConverter;

    }

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        //Here we add our custom-configured HttpMessageConverter
        converters.add(jacksonMessageConverter());
        super.configureMessageConverters(converters);
    }

 */
}