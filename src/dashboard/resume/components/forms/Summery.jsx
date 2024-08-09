import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../service/GlobalApi";
import { Brain, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { AIChatSession } from "./../../../../../service/AIModal";

const promot =
  "job Title: {jobTitle} , Depends on job title give me summery for my resume within 4-5 lines in JSON format with field experince Level and Summery with Experience level for Fresher,Mid-Level,Experienced";

const Summery = ({ enabledNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summery, setSummery] = useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [aiGeneratedSummeryList, setAiGeneratedSummeryList] = useState([]);



  const GenerateSummeryFromAI = async () => {
    setLoading(true);
    const PROMPT = promot.replace("{jobTitle}",resumeInfo?.jobTitle);
    console.log(PROMPT);
    const result = await AIChatSession.sendMessage(PROMPT);
    console.log(JSON.parse(result.response.text()));
    setAiGeneratedSummeryList(JSON.parse([result.response.text()]));
    setLoading(false);
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data:{
        summery:summery,
      },
    };
    GlobalApi.UpdateResumeDetail(params?.resumeId,data).then(
      (resp) => {
        console.log(resp);
        enabledNext(true);
        setLoading(false);
        toast("Details updated");
      },
      (error) => {
        setLoading(false);
      }
    );
  };
  useEffect(() => {
    summery&&setResumeInfo({
        ...resumeInfo,
        summery:summery,
      });
  },[summery]);
  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summery</h2>
        <p>Add Summery for your job title</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add Summery</label>
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() => GenerateSummeryFromAI()}
              className="border-primary text-primary flex gap-2"
            >
              <Brain className="h-4 w-4" />
              Generate from AI
            </Button>
          </div>
          <Textarea
            className="mt-5"
            required
            onChange={(e) => setSummery(e.target.value)}
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>

      {aiGeneratedSummeryList && aiGeneratedSummeryList.length > 0 && (
        <div>
            <h2 className="font-bold text-lg">Suggestions</h2>
            {aiGeneratedSummeryList.map((item,index) => (
                <div key={index}>
                    <h2 className="font-bold my-1">Level:{item?.experienceLevel}</h2>
                    <p>{item?.summery}</p>
                </div>
            ))}
        </div>
    )}
    </div>
  );
};

export default Summery;
