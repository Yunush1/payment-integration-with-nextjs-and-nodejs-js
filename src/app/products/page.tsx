'use client'
import { resolve } from "path";
import { cardsData } from "../../../data/course-data";
import { CardCompo } from "../component/cardcomponent";
import { useEffect } from "react";
import axios from "axios";
import { Navbar } from "../component/Nav.bar";

export default function Page(){

    const loadScript = (src:string)=>{
        return new Promise((resolve)=>{
            const script = document.createElement('script');
            script.src = src;
            script.onload = () =>{
                resolve(true);
            }
            script.onerror= ()=>{
                resolve(false);
            }

            document.body.appendChild(script);
        });
    }

    const onPayment = async(price:number, intemName:string)=>{
        // create order

        try{
            
            const options = {
                course_id:1,
                amount:price,
            };

            const res = await axios.post('https://payment-integration-67la.onrender.com/api/v2/createOrder',options);

            const data = res.data;
            console.log(data);

            const paymentObject = new (window as any).Razorpay({
                key:'rzp_test_9FzJtivMEKyUvo',
                order_id : data.id,
                ...data,

                handler: function(res:any){
                    console.log(res);

                    const optionTwo = {
                        order_id : res.razorpay_order_id,
                        payment_id: res.razorpay_payment_id,
                        signature: res.razorpay_signature,
                    }

                    axios.post('https://payment-integration-67la.onrender.com/api/v2/verifyPayment',optionTwo).then((res)=>{
                        if(res.data.success){
                            alert('payment success')
                        }else{
                            alert('payment failed')
                        }
                    });
                }
            })
            paymentObject.open();
        }catch(err){
            console.log("Err",err);
        }
    }

    useEffect(()=>{
        loadScript('https://checkout.razorpay.com/v1/checkout.js');
    },[])

    return <div>
        <Navbar/>
       <div className="mt-8 flex w-[calc(100%-10%)] mx-auto justify-around gap-8 flex-wrap">
        {
            cardsData.map((card, index)=>(
                <CardCompo key={index} onPayment ={onPayment} {...card}/>
            ))
        }
       </div>
    </div>
}