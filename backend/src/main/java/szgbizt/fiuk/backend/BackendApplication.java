package szgbizt.fiuk.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import szgbizt.fiuk.backend.Models.User;
import szgbizt.fiuk.backend.Repositories.UserRepository;

@SpringBootApplication
public class BackendApplication implements CommandLineRunner {

    @Autowired
    UserRepository userRepository;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Bean
    public WebMvcConfigurer corsConfigurer(){
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("*").allowedOrigins("http://localhost:3000");
            }
        };
    }

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);

    }

    @Override
    public void run(String... args) throws Exception {
        User user = new User();
        user.setAdmin(true);
        user.setEmail("admin");
        user.setPassword(passwordEncoder.encode("admin"));
        userRepository.save(user);
    }

}
