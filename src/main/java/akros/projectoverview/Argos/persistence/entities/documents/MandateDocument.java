package akros.projectoverview.Argos.persistence.entities.documents;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Builder
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
@ToString
@Document("mandate")
public class MandateDocument {

    @Id
    private String id;

    private String projectId;

    private String employee;

    private Date startDate;

    private Date endDate;

    private MandateDescription description;

    private int happiness;

}
