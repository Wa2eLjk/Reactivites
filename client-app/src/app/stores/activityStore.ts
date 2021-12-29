import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import {v4 as uuid} from 'uuid'

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
    
    try {
      const activites = await agent.Activites.list();

      activites.forEach((activity) => {
        activity.date = activity.date.split("T")[0];
        this.activityRegisty.set(activity.id,activity)
      });

      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };


  selectActivity = (id: string) => {
      this.selectedActivity = this.activityRegisty.get(id);
  }

  cancelSelectedAcitvity = () => {
      this.selectedActivity = undefined;
  }
  openForm = (id? : string) => {
      id ? this.selectActivity(id) : this.cancelSelectedAcitvity();
      this.editMode = true;
  }

  closeForm = () => {
      this.editMode = false;
  }

  createActivity =async (activity:Activity) => {
      this.loading = true
      activity.id = uuid()
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
            if (this.selectedActivity?.id === id) {
                this.cancelSelectedAcitvity()
            }
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
