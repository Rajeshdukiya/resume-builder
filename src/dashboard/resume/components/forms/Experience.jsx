import React, { useContext, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RichTextEditor from "../RichTextEditor";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";

const formField = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummery: "",
};

const Experience = () => {
  const [experienceList, setExperienceList] = useState([formField]);
  const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);

  const [loading,setLoading]=useState(false);

  const handleChange = (index, event) => {
    const newEntries=experienceList.slice();
    const {name ,value}= event.target;
    newEntries[index][name]=value;
    setExperienceList(newEntries);
  };

  const AddNewExperience=()=>{
    setExperienceList([...experienceList,formField])
  }

  const RemoveExperience=()=>{
    setExperienceList(experienceList=>experienceList.slice(0,-1))
  }

  const handleRichTextEditor = (e,name,index)=>{
    const newEntries=experienceList.slice();
    newEntries[index][name]=e.target.value;
    setExperienceList(newEntries)
  }

  const onSave=()=>{
    setLoading(true)
    const data={
        data:{
            Experience:experinceList.map(({ id, ...rest }) => rest)
        }
    }

     console.log(experienceList)

    GlobalApi.UpdateResumeDetail(params?.resumeId,data).then(res=>{
        console.log(res);
        setLoading(false);
        toast('Details updated !')
    },(error)=>{
        setLoading(false);
    })

}

  useEffect(()=>{
    setResumeInfo({
      ...resumeInfo,
      Experience:experienceList
  });
  },[experienceList])

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p>Add Your previous Job experience</p>
        <div>
          {experienceList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div>
                  <label className="text-xs">Position Title</label>
                  <Input
                    name="title"
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div>
                  <label className="text-xs">company Name</label>
                  <Input
                    name="companyname"
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div>
                  <label className="text-xs">City</label>
                  <Input
                    name="city"
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div>
                  <label className="text-xs">State</label>
                  <Input
                    name="state"
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div>
                  <label className="text-xs">Start Date</label>
                  <Input
                    type="date"
                    name="startdate"
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div>
                  <label className="text-xs">End Date</label>
                  <Input
                    type="date"
                    name="enddate"
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div className='col-span-2'>
                           {/* Work Summery  */}
                           <RichTextEditor
                           index={index}
                           defaultValue={item?.workSummery}
                           onRichTextEditorChange={(event)=>handleRichTextEditor(event,'workSummery',index)}  />
                        </div>
              </div>
            </div>
          ))}
        </div>
        <div className='flex justify-between'>
            <div className='flex gap-2'>
            <Button variant="outline" onclick={AddNewExperience}  className="text-primary"> + Add More Experience</Button>
            <Button variant="outline" onclick={RemoveExperience} className="text-primary"> - Remove</Button>

            </div>
             <Button disabled={loading} onClick={()=>onSave()}>
            {loading?<LoaderCircle className='animate-spin' />:'Save'}    
            </Button>
            
        </div>
      </div>
    </div>
  );
};

export default Experience;
