package szgbizt.fiuk.backend.Auth;



import org.jetbrains.annotations.Nullable;

public final class AuthException extends Exception {
    public AuthException(@Nullable String message) {
        super(message);
    }
}
