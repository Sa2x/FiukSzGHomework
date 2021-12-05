package szgbizt.fiuk.backend.Auth;

import kotlin.jvm.internal.Intrinsics;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;
import szgbizt.fiuk.backend.Models.User;

import static org.springframework.web.bind.support.WebArgumentResolver.UNRESOLVED;

public class AuthTokenWebResolver implements HandlerMethodArgumentResolver {

    @Autowired
    AuthTokenHandler authTokenHandler;

    @Override
    public boolean supportsParameter(@NotNull MethodParameter parameter) {
       // return parameter.getParameterAnnotations(Auth.class) != null;
        Intrinsics.checkNotNullParameter(parameter, "methodParameter");
        return parameter.getParameterAnnotation(Auth.class) != null;
    }

    @Override
    public Object resolveArgument(@NotNull MethodParameter parameter, ModelAndViewContainer mavContainer, @NotNull NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        if(parameter.getParameterType() == User.class){
            String authToken = webRequest.getHeader("Bearer");
            if(authToken == null){
                throw new AuthException("No token found");
            }
            try {
                return authTokenHandler.getUserFromToken(authToken);
            } catch (Throwable e) {
                e.printStackTrace();
            }
        }
        return UNRESOLVED;
    }
}
