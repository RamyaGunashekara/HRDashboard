function getDetails(){ 
          var KpiName = $.request.parameters.get('kpi');
          var pstmt="", object ={},objList=[];
          var conn = $.db.getConnection();  
          pstmt = conn.prepareStatement('SELECT * FROM "KPI_HR"."KPI_DASHBOARD" WHERE "PARENT_LOB_ID" = ?'); 
          pstmt.setString(1,KpiName);
          var rs = pstmt.executeQuery();
				while(rs.next()){
				    object.kpi = rs.getString(1);
				    object.lob = rs.getString(2);
				    object.type = rs.getString(3);
				    object.target = rs.getString(4);
				    object.q1 = rs.getString(5);
				    object.q2=rs.getString(6);
				    object.q3=rs.getString(7);
				    object.q4=rs.getString(8);
				    object.tot=rs.getString(9);
				    objList.push({
				        KPI:object.kpi,
				        LOB:object.lob,
				        Type:object.type, 
				        Target:object.target,
				        Q1:object.q1,
				        Q2:object.q2,
				        Q3:object.q3,
				        Q4:object.q4,
				        Total:object.tot,
				        Percentage : (parseFloat(object.tot)/parseFloat(object.target))*100
				    });
				}
				conn.commit();
				pstmt.close();
				conn.close();
				return objList;
				
				
}
try{  
        	$.response.contentType = 'application/json';  
            var response =  JSON.stringify( 
                 getDetails() 
                );
            $.response.setBody(response);
        }  
        catch(err){  
                  $.response.contentType = "text/plain";  
                  $.response.setBody("Error while executing query: [" + err.message + "]");  
                  $.response.returnCode = 200;  
        }  
 

          