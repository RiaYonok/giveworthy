import { Map } from 'immutable';
import User from '@models/User';
import Cause from '@models/Cause';
export const localState = ()=>{
    try{
        const persistedState = localStorage.getItem('state');
        if (persistedState===null){
            return undefined;
        }else{
            var payload  = JSON.parse(persistedState);
            payload = {
                users:Map({
                    users: Map(payload.users.users),
                    isLoading: payload.users.isLoading,
                    current: new User(payload.users.current)
                }),
                errors:Map(payload.errors),
                questionnaires:Map(payload.questionnaires),
                status:Map(payload.status),
                cause:Map({
                    cause:new Cause(payload.cause.cause)})
            }
            return payload;
        }

    }catch(err){
        console.log(err);
        return undefined;
    }
}

export const saveState = (state)=>{
    try{
        const persistedState = JSON.stringify(state);
        localStorage.setItem("state", persistedState);
    }catch(err){
        console.log(err);
    }
}