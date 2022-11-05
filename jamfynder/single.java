public class deleteAcct{
    private static deleteAcct instance = null;
    private SpotifyType account;

    private deleteAcct() { 
 account = deleteAccount(account,clientID,secretKey);
   }

    public static deleteAcct getAcct() {
      if (instance == null ) 
		instance = new deleteAcct();                           
      return instance;
    }
}
deleteAcct connection = deleteAcct.getAcct();
