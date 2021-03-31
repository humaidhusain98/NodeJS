var transact= class Transaction {
    
    constructor(id,description,amt,putin){
        this.id=id;
        this.description=description;
        this.amt=amt;
        this.putin=putin;
    }

    toString()
    {
        return `id=${this.id}, description= ${this.description}, amt= ${this.amt} , putin= ${this.putin}`;
    }

    getId(){
        return this.id
    }

    setId(id){
        this.id=id;
    }

    getDes(){
        return this.description
    }

    setDes(desc){
        this.description=desc;
    }

    getDes(){
        return this.amt
    }

    setAmt(amt){
        this.amt=amt;
    }

    getPutin(){
        return this.putin
    }

    setPutin(put){
        this.putin=put;
    }


}
module.exports=transact