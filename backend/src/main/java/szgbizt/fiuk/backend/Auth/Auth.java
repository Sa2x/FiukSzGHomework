package szgbizt.fiuk.backend.Auth;

import java.lang.annotation.ElementType;
import java.lang.annotation.RetentionPolicy;
import kotlin.annotation.AnnotationRetention;
import kotlin.annotation.AnnotationTarget;
import kotlin.annotation.Retention;
import kotlin.annotation.Target;

@Retention(AnnotationRetention.RUNTIME)
@Target(
        allowedTargets = {AnnotationTarget.VALUE_PARAMETER}
)
@java.lang.annotation.Retention(RetentionPolicy.RUNTIME)
@java.lang.annotation.Target({ElementType.PARAMETER})
public @interface Auth {
}

