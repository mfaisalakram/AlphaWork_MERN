import React,{useEffect} from 'react'
import { useToasts } from 'react-toast-notifications'
import {connect} from 'react-redux';
const Toast = (props) => {

    const { addToast } = useToasts()

// console.log(props.toasts);
useEffect(() => {

 if(props.toasts.length>0){
    props.toasts.map(t=>{

            addToast(t.msg, {
                appearance: t.type,
                autoDismiss: true,
              })
       
            
     })
    
 }




}, [props.toasts])

  

//     let alertsX=null;
//    console.log(props.toasts)
//     if(props.toasts!==null && props.toasts.length>0){
//        alertsX=props.toasts.map(alert=>{

      

//     //    return <div key={alert.id} className={`alert alert-${alert.alertType}`} >{alert.msg}</div>
//        })
//     }
    
    return (
        <div>
           {/*  */}
        </div>
    )
}


const mapStatetoprops=state=>({
    toasts:state.toasts
})

export default connect(mapStatetoprops)(Toast)
