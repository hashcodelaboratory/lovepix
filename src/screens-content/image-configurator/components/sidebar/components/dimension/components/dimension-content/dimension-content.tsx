import Box from "@mui/material/Box";
import { Tabs, Tab } from "@mui/material";
import { SyntheticEvent, useContext, useState } from "react";
import { a11yProps } from "./utils/utils";
import TabPanel from "./components/tab-panel";
import { useTranslation } from "next-i18next";
import { messages } from "../../../../../../../../messages/messages";
import TabPanelBox from "./components/tab-panel-box";
import AppContext from "../../../../../../../../app-context/app-context";

const DimensionContent = () => {
  const { t } = useTranslation();

  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const {
    state: { dimensionId },
    stateAction: { setDimensionId },
  } = useContext(AppContext);

  const dimensionsByWidth = [
    { width: 105, height: 70, id: "w1" },
    { width: 30, height: 20, id: "w2" },
    { width: 90, height: 60, id: "w3" },
    { width: 60, height: 40, id: "w4" },
    { width: 45, height: 30, id: "w5" },
    { width: 120, height: 80, id: "w6" },
  ];

  const dimensionsByHeight = [
    { width: 60, height: 90, id: "h1" },
    { width: 30, height: 45, id: "h2" },
    { width: 40, height: 60, id: "h3" },
    { width: 20, height: 30, id: "h4" },
    { width: 50, height: 75, id: "h5" },
    { width: 80, height: 120, id: "h6" },
    { width: 70, height: 105, id: "h7" },
  ];

  const dimensionsBySquare = [
    { width: 100, height: 100, id: "s1" },
    { width: 80, height: 80, id: "s2" },
    { width: 50, height: 50, id: "s3" },
  ];

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
        >
          <Tab label={String(t(messages.byWidth))} {...a11yProps(0)} />
          <Tab label={String(t(messages.byHeight))} {...a11yProps(1)} />
          <Tab label={String(t(messages.square))} {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {dimensionsByWidth.map((dim) => (
          <TabPanelBox
            url='https://firebasestorage.googleapis.com/v0/b/lovepix-78bf6.appspot.com/o/dimensions%2Fhorizontal-rectangle%2F105x70.svg?alt=media&token=b29eaad0-5196-4eaf-b412-70120a93ad57'
            x={dim.width}
            y={dim.height}
            onClick={() => setDimensionId(dim.id)}
          />
        ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {dimensionsByHeight.map((dim) => (
          <TabPanelBox
            url='https://firebasestorage.googleapis.com/v0/b/lovepix-78bf6.appspot.com/o/dimensions%2Fhorizontal-rectangle%2F105x70.svg?alt=media&token=b29eaad0-5196-4eaf-b412-70120a93ad57'
            x={dim.width}
            y={dim.height}
            onClick={() => setDimensionId(dim.id)}
          />
        ))}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {dimensionsBySquare.map((dim) => (
          <TabPanelBox
            url='https://firebasestorage.googleapis.com/v0/b/lovepix-78bf6.appspot.com/o/dimensions%2Fhorizontal-rectangle%2F105x70.svg?alt=media&token=b29eaad0-5196-4eaf-b412-70120a93ad57'
            x={dim.width}
            y={dim.height}
            onClick={() => setDimensionId(dim.id)}
          />
        ))}
      </TabPanel>
    </div>
  );
};

export default DimensionContent;
