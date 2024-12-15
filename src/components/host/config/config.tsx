import classes from "./config.module.css";
import React, { useState, useEffect } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  FormControl,
  Paper,
  PaperProps,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { editOrMakeConifg, getConfigForPublicUse } from "../../../lib/utils";
import { type Config as ConfigType } from "../../../lib/types";

interface ConfigProps extends PaperProps {
  host: string;
  handleClose: () => void;
  open: boolean;
}

const Config = ({
  host,
  handleClose,
  open,
  ...rest
}: ConfigProps): JSX.Element => {
  const initialFormData = {
    host: {
      name: "",
      port: 22,
      hostname: "",
      username: "",
      password: "",
    },
    commands: [],
  };
  const [formData, setFormData] = useState<ConfigType>(initialFormData);
  const [config, setConfig] = useState<ConfigType>();

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editOrMakeConifg(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      host: {
        ...prevFormData.host,
        [name]: value,
      },
    }));
  };

  const getConfig = async () => {
    setConfig(await getConfigForPublicUse(host));
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    if (config) {
      setFormData(config);
    }
  }, [config]);

  return (
    <>
      {config && (
        <Dialog
          onClose={() => {
            setFormData(config);
            handleClose();
          }}
          open={open}
        >
          <DialogContent>
            <Paper
              className={classes.config}
              component="form"
              onSubmit={handleSubmit}
              {...rest}
            >
              <FormControl fullWidth>
                {Object.keys(config.host).map((key: string) => (
                  <Box
                    display="flex"
                    alignItems="center"
                    className={classes.configOption}
                    key={key}
                  >
                    <Typography
                      variant="body1"
                      sx={{ mr: 2, minWidth: "100px" }}
                    >
                      {capitalizeFirstLetter(key)}
                    </Typography>
                    <TextField
                      id={key}
                      variant="outlined"
                      name={key}
                      placeholder={config.host[
                        key as keyof ConfigType["host"]
                      ]?.toString()}
                      value={formData.host[
                        key as keyof ConfigType["host"]
                      ]?.toString()}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Box>
                ))}
                <Button type="submit">Submit</Button>
              </FormControl>
            </Paper>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default Config;
