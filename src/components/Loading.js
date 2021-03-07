import { dateFmt, getRegion, regionTxt } from "../util/date";

export const Loading = () => {
  return (
    <div class="loader ss">
      <h2>{dateFmt(new Date())}</h2>
    </div>
  )
};