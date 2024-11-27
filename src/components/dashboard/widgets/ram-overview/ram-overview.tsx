import { Typography } from "@mui/material";
import styles from "./ram-overview.module.css";
import MemoryIcon from "@mui/icons-material/Memory";

const getRamColor = (usage: number) => {
  if (usage > 80) return "#FF000050";
  if (usage > 50) return "#FFA50050";
  return "#00FF0050";
};

export const RamOverview = ({ usage }: { usage?: string }) => {
  const color = getRamColor(Number(usage?.replace("%", "") || 0));

  return (
    <div className={styles.overview} style={{ backgroundColor: color }}>
      <MemoryIcon className={styles.memoryIcon} />
      <Typography variant="body2" color="text.secondary">
        {usage}
      </Typography>
    </div>
  );
};
