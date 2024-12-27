
export function convertCategory(cat_id: number) {
    switch(cat_id){
        case 26:
            return "cirúrgico"
            break
        case 27:
            return "dental"
            break
        case 28:
            return "ortopédico"
            break
        case 29:
            return "pediátrico"
            break
        case 30:
            return "cardiológico"
            break    
    }
}