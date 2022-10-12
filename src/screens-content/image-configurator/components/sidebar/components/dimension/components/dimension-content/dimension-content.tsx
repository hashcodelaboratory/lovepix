import Box from "@mui/material/Box";
import {Tabs, Tab} from "@mui/material";
import {SyntheticEvent, useState} from "react";
import {a11yProps} from "./utils/utils";
import TabPanel from "./components/tab-panel";
import {useTranslation} from "next-i18next";
import {messages} from "../../../../../../../../messages/messages";
import TabPanelBox from "./components/tab-panel-box";

const DimensionContent = () => {
    const { t } = useTranslation();

    const [value, setValue] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return(
      <div>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  <Tab label={String(t(messages.byWidth))} {...a11yProps(0)} />
                  <Tab label={String(t(messages.byHeight))} {...a11yProps(1)} />
                  <Tab label={String(t(messages.square))} {...a11yProps(2)} />
              </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
              <TabPanelBox url='https://firebasestorage.googleapis.com/v0/b/lovepix-78bf6.appspot.com/o/dimensions%2Fhorizontal-rectangle%2F105x70.svg?alt=media&token=b29eaad0-5196-4eaf-b412-70120a93ad57'
                    x={105} y={70}
              />
          </TabPanel>
          <TabPanel value={value} index={1}>
              Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
              Item Three
          </TabPanel>
      </div>
  )
}

export default DimensionContent