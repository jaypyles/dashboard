import classes from "./add-command.module.css";
import React, { useState } from "react";
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
import { AddCommand as AddCommandType } from "../../../lib/types";
import { addCommand } from "../../../lib/utils";
import { toast } from "react-toastify";

interface AddCommandProps extends PaperProps {
  host: string;
  handleClose: () => void;
  open: boolean;
}

const AddCommand = ({
  host,
  handleClose,
  open,
  ...rest
}: AddCommandProps): JSX.Element => {
  const initialFormData: AddCommandType = {
    host: host,
    command: {
      name: "",
      command: "",
      args: [],
      type: "user",
    },
  };

  const [formData, setFormData] = useState<AddCommandType>(initialFormData);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await addCommand(formData);
    if (response.status === "failure") {
      toast.error(response.reason);
      return;
    }

    handleClose();

    const event = new CustomEvent("commandAdded", { detail: formData });
    window.dispatchEvent(event);

    toast.success(response.reason);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      command: {
        ...prevFormData.command,
        [name]: value,
      },
    }));
  };

  const handleAddArg = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      command: {
        ...prevFormData.command,
        args: [...prevFormData.command.args, { flag: "", value: "" }],
      },
    }));
  };

  const handleArgChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const newArgs = formData.command.args.map((arg, i) =>
      i === index ? { ...arg, [name]: value } : arg
    );
    setFormData((prevFormData) => ({
      ...prevFormData,
      command: {
        ...prevFormData.command,
        args: newArgs,
      },
    }));
  };

  return (
    <Dialog
      onClose={() => {
        handleClose();
        setFormData(initialFormData);
      }}
      open={open}
    >
      <DialogContent>
        <Paper
          className={classes.addCommand}
          component="form"
          onSubmit={handleSubmit}
          {...rest}
        >
          <FormControl fullWidth>
            <Box
              display="flex"
              alignItems="center"
              className={classes.commandOption}
            >
              <Typography variant="body1" sx={{ mr: 2, minWidth: "100px" }}>
                Command Name
              </Typography>
              <TextField
                id="command-name"
                variant="outlined"
                name="name"
                value={formData.command.name}
                onChange={handleChange}
                fullWidth
                required
              />
            </Box>
            <Box
              display="flex"
              alignItems="center"
              className={classes.commandOption}
            >
              <Typography variant="body1" sx={{ mr: 2, minWidth: "100px" }}>
                Command
              </Typography>
              <TextField
                id="command"
                variant="outlined"
                name="command"
                value={formData.command.command}
                onChange={handleChange}
                fullWidth
                required
              />
            </Box>

            {formData.command.args.map((arg, index) => (
              <Box
                key={index}
                display="flex"
                alignItems="center"
                className={classes.commandOption}
                mt={2}
              >
                <Typography variant="body1" sx={{ mr: 2, minWidth: "100px" }}>
                  Arg
                </Typography>
                <TextField
                  id={`flag-${index}`}
                  variant="outlined"
                  name="flag"
                  label="Flag"
                  value={arg.flag}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleArgChange(index, e)
                  }
                  sx={{ mr: 2 }}
                />
                <TextField
                  id={`value-${index}`}
                  variant="outlined"
                  name="value"
                  label="Value"
                  value={arg.value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleArgChange(index, e)
                  }
                />
              </Box>
            ))}

            <Button onClick={handleAddArg} sx={{ mt: 2 }}>
              + Add Arg
            </Button>

            <Button type="submit" sx={{ mt: 2 }}>
              Submit
            </Button>
          </FormControl>
        </Paper>
      </DialogContent>
    </Dialog>
  );
};

export default AddCommand;
