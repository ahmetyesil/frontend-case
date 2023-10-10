import {useEffect, useState} from "react";
import { Checkbox, Input} from "antd";
import {FiSearch} from "react-icons/fi";
import {CheckboxChangeEvent} from "antd/es/checkbox";
import {useMutateApi} from "@/Hooks/index";
import {deleteCookie, getCookie, removeCookies, setCookie} from "cookies-next";


export default function HomeView() {
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<string[]>([]);
    const [list, setList] = useState([]);
    const [getCategories] = useMutateApi({
        apiPath: "/categories",
        method: "GET",
    });

    useEffect(() => {
        getData();
    }, [search]);


    useEffect(() => {
        const selectedCategories: any = getCookie('categories');
        console.log('selectedCategories');
        if (selectedCategories) {
            setSelected(JSON.parse(selectedCategories));
        }

       getData();
       //deleteCookie('categories');
    }, []);

    const getData = async () => {
        const response = await getCategories({},{search});
        setList(response.data && response.data.length > 0 ? response.data : []);
        console.log('selected', selected);
    };

    const onChange = (e: CheckboxChangeEvent, category:string) => {
        if (e.target.checked) {
            const data = selected.concat([category]);
            console.log('data', data);
            setSelected(data);
            setCookie("categories",data);
        } else  {
            const index = selected.indexOf(category);
            if (index !== -1) {
                const data:string[] = [...selected];
                data.splice(index,1);
                setSelected(data);
                setCookie("categories",data);
            }
        }
    }

  return (
    <div
      style={{
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        display: "flex",
        height: "100vh",
      }}
    >
        <div className="max-w-[400px] w-full border border-[#d2d1cd] rounded-lg bg-[#f7f7f7] p-8">
            <div className="mb-4">
                <strong className="font-semibold text-xl">Kategoriler</strong>
            </div>
            <div className="mb-4">
                <Input size="large"
                    placeholder="Kategori Ara"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    suffix={
                            <FiSearch style={{ color: 'rgba(0,0,0,.45)' }} />
                    }
                />
            </div>
            <div className="h-[350px] overflow-auto">

                {
                    selected.map((item: string,index:number)=>{
                        return (<div className="mb-2" key={index}>
                            <Checkbox checked={selected.indexOf(item) !== -1}  onChange={(e)=> {onChange(e,item)}}>{item}</Checkbox>
                        </div>)
                    })
                }
                {
                    list.filter((item)=> (selected.indexOf(item) === -1)).map((item: string,index:number)=>{
                        return (<div className="mb-2" key={index}>
                            <Checkbox checked={false}  onChange={(e)=> {onChange(e,item)}}>{item}</Checkbox>
                        </div>)
                    })
                }
            </div>
        </div>
    </div>
  );
}
