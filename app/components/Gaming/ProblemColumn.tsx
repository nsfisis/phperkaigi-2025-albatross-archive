import TitledColumn from "../TitledColumn";
import ProblemColumnContent from "./ProblemColumnContent";

type Props = {
	title: string;
	description: string;
	sampleCodeHtml: string;
};

export default function ProblemColumn({
	title,
	description,
	sampleCodeHtml,
}: Props) {
	return (
		<TitledColumn title={title}>
			<ProblemColumnContent
				description={description}
				sampleCodeHtml={sampleCodeHtml}
			/>
		</TitledColumn>
	);
}
