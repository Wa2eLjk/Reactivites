import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";


export default class ActivityStore {
  activityRegisty = new Map<string,Activity>();
  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get activitesByDate() {
      return Array.from(this.activityRegisty.values()).sort((a,b) => 
      Date.parse(a.date) - Date.parse(b.date))
  }

  loadActivites = async () => {
    this.loadingInitial = true
    try {
      const activites = await agent.Activites.list();

      activites.forEach((activity) => {
        this.setActivity(activity)
      });

      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  loadactivity =async (id:string) => {
    
    let activity = this.getactivity(id)
    if (activity) {
      this.selectedActivity = activity;
      return activity;
    } else{
      this.loadingInitial = true;
      try {
        activity = await agent.Activites.details(id);
        this.setActivity(activity);
        runInAction(()=>{
          this.selectedActivity = activity
        })
        
        this.setLoadingInitial(false)
        return activity
      } catch (error) {
        console.log(error)
        this.setLoadingInitial(false)
      }
    }
  }
  private setActivity = (activity:Activity) => {
      activity.date = activity.date.split("T")[0];
      this.activityRegisty.set(activity.id,activity)
  }
  private getactivity = (id:string) => {
    return this.activityRegisty.get(id)
  }
  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };


  createActivity =async (activity:Activity) => {
      this.loading = true
      
        try {
            await agent.Activites.create(activity)
            runInAction(() => {
                this.activityRegisty.set(activity.id,activity)
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;

            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false;
            })
        }
  }


  updateActivity = async (activity: Activity) => {
      this.loading = true;
      try {
          await agent.Activites.update(activity);
          runInAction(() => {
              this.activityRegisty.set(activity.id,activity)
              this.selectedActivity = activity;
              this.editMode = false;
              this.loading = false
              
          })
      } catch (error) {
          console.log(error)
          runInAction(() => {
  
            this.loading = false
            
        })
      }
  }

  deleteactivity = async (id : string) => {
    this.loading = true;
    try {
        await agent.Activites.delete(id);
        runInAction(() => {
            this.activityRegisty.delete(id)
            this.loading  = false;
        })
    } catch (error) {
        console.log(error)

        runInAction(()=> {
            this.loading = false;
        })
    }
  }
}
