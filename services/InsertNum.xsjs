try{ 
          var inum = $.request.parameters.get("inum");
          var num = inum.toUpperCase();
          var name1 = $.request.parameters.get("name");
          var pstmt="";
          var conn = $.db.getConnection();  
          pstmt = conn.prepareStatement('INSERT INTO "KPI_HR"."I_NUM" VALUES(?,?)'); 
          pstmt.setString(1,num);
          pstmt.setString(2,name1);
          pstmt.executeQuery();
          conn.commit();
		  pstmt.close();
		  conn.close();
		  $.response.setBody("Upload Successful");  
}
catch(err){  
             $.response.contentType = "text/plain";  
             $.response.setBody("Error while executing query: [" + err.message + "]");  
             $.response.returnCode = 200;  
}  
 

          