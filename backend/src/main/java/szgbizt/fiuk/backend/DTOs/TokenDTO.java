package szgbizt.fiuk.backend.DTOs;

public class TokenDTO {

   private String token;

   public TokenDTO(String token){
       this.token = token;
   }

   public TokenDTO(){
       token = null;
   }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
