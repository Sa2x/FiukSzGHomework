package szgbizt.fiuk.backend.Auth;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import java.util.List;
import java.util.Set;
import kotlin.Metadata;
import kotlin.jvm.internal.DefaultConstructorMarker;
import kotlin.jvm.internal.Intrinsics;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import szgbizt.fiuk.backend.Models.User;
import szgbizt.fiuk.backend.Repositories.UserRepository;

//TODO: Ez a kód Kotlin bytecodeból lett decompileolva, ha valaki ráér szebbítse meg.

@Component
public class AuthTokenHandler {
    private final UserRepository userRepository;

    @Transactional
    @Nullable
    public User getUserFromToken(@Nullable String token) throws Throwable {
        if (token == null) {
            throw new AuthException("JWT Token not found");
        }
        Claims claims = Jwts.parser().setSigningKey("secret").parseClaimsJws(token).getBody();
        if(!userRepository.existsById((Integer) claims.get("user_id"))){
            throw new AuthException("Authentication failed, JWT is not valid");
        }
        User user = new User();
        user.setId((Long)claims.get("user_id"));
        user.setEmail((String)claims.get("user_email"));
        user.setAdmin((boolean)claims.get("user_admin"));
        return user;
    }

    public AuthTokenHandler(@NotNull UserRepository userRepository) {
        super();
        Intrinsics.checkNotNullParameter(userRepository, "userRepository");
        this.userRepository = userRepository;
    }
}
