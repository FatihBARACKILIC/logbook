import { toast } from "@/components/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { actions, isInputError } from "astro:actions";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";

type Props = {
  contentId: number;
  episode: number;
};

export function UpdateEpisode({ contentId, episode }: Props) {
  const [currentEpisode, setCurrentEpisode] = useState(episode);
  return (
    <div className="flex items-center justify-center gap-2">
      <DecreaseButton {...{ contentId, episode: currentEpisode, setEpisode: setCurrentEpisode }} />
      <Episode {...{ contentId, episode: currentEpisode, setEpisode: setCurrentEpisode }} />
      <IncreaseButton {...{ contentId, episode: currentEpisode, setEpisode: setCurrentEpisode }} />
    </div>
  );
}

type SubElementProps = Props & { setEpisode: (v: number) => void };

function Episode({ contentId, episode, setEpisode }: SubElementProps) {
  const episodeRef = useRef(episode);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await actions.contents.updateEpisode({
      contentId,
      episode
    });

    if (error && isInputError(error)) {
      setEpisode(episodeRef.current);
      return toast.error(error.fields.episode?.join(", ") ?? "Please enter a valid number");
    } else if (error) {
      setEpisode(episodeRef.current);
      return toast.error(error.message);
    } else if (!data) {
      setEpisode(episodeRef.current);
      return toast.error("Something went wrong");
    }
    setEpisode(data.episode);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const number = parseInt(e.target.value);
    if (isNaN(number)) {
      return setEpisode(0);
    }
    setEpisode(number);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input value={episode} onChange={onChange} />
    </form>
  );
}

function IncreaseButton({ contentId, episode, setEpisode }: SubElementProps) {
  const handleIncrease = async () => {
    const { data, error } = await actions.contents.updateEpisode({
      contentId,
      episode: episode + 1
    });
    if (error && isInputError(error)) {
      return toast.error(error.fields.episode?.join(", ") ?? "Please enter a valid number");
    } else if (error) {
      return toast.error(error.message);
    } else if (!data) {
      return toast.error("Something went wrong");
    }
    setEpisode(data.episode);
  };

  return (
    <Button variant="outline" size="icon" onClick={handleIncrease}>
      <PlusIcon />
    </Button>
  );
}

function DecreaseButton({ contentId, episode, setEpisode }: SubElementProps) {
  const handleDecrease = async () => {
    const { data, error } = await actions.contents.updateEpisode({
      contentId,
      episode: episode - 1
    });
    if (error && isInputError(error)) {
      return toast.error(error.fields.episode?.join(", ") ?? "Please enter a valid number");
    } else if (error) {
      return toast.error(error.message);
    } else if (!data) {
      return toast.error("Something went wrong");
    }
    setEpisode(data.episode);
  };

  return (
    <Button variant="outline" size="icon" onClick={handleDecrease}>
      <MinusIcon />
    </Button>
  );
}
